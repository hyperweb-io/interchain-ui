import * as React from "react";
import { useState, useRef, useEffect } from "react";
import anime from "animejs";
import type { AnimeInstance } from "animejs";
import clx from "clsx";
import Box from "../box";
import FadeIn from "../fade-in";
import WalletButton from "../connect-modal-wallet-button";
import {
  walletList,
  squareWallets,
  listWallets,
  container,
} from "./connect-modal-wallet-list.css";
import { bottomShadow } from "../shared/shared.css";
import { store } from "../../models/store";
import type { ConnectModalWalletListProps } from "./connect-modal-wallet-list.types";

function ConnectModalWalletList(props: ConnectModalWalletListProps) {
  const measureRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimeInstance | null>(null);
  const cleanupRef = useRef<() => void>(null);
  const [displayBlur, setDisplayBlur] = useState(() => false);

  const [internalTheme, setInternalTheme] = useState(() => "light");

  function onWalletItemClickAsync(exec) {
    void (async function () {
      await exec();
    })();
  }

  function getListShapeWallets() {
    return props.wallets.filter((w) => w.shape === "list");
  }

  function showSquareShapeWallets() {
    return props.wallets
      .slice(0, 2)
      .every((wallet) => wallet.shape === "square");
  }

  useEffect(() => {
    setInternalTheme(store.getState().theme);
    const unsubTheme = store.subscribe((newState) => {
      setInternalTheme(newState.theme);
    });
    if (measureRef.current) {
      if (measureRef.current.clientHeight >= 320) {
        setDisplayBlur(true);
      } else {
        setDisplayBlur(false);
      }
      const scrollHandler = () => {
        const height = Math.abs(
          measureRef.current.scrollHeight -
            measureRef.current.clientHeight -
            measureRef.current.scrollTop
        );
        if (height < 1) {
          setDisplayBlur(false);
        } else {
          setDisplayBlur(true);
        }
      };
      measureRef.current.addEventListener("scroll", scrollHandler);
      cleanupRef.current = () => {
        unsubTheme();
        if (measureRef.current) {
          measureRef.current.removeEventListener("scroll", scrollHandler);
        }
      };
    }
  }, []);

  useEffect(() => {
    if (!shadowRef.current) return;

    // Animation not init yet
    if (shadowRef.current && !animationRef.current) {
      animationRef.current = anime({
        targets: shadowRef.current,
        opacity: [0, 1],
        height: [0, 36],
        delay: 50,
        duration: 250,
        direction: `alternate`,
        loop: false,
        autoplay: false,
        easing: `easeInOutSine`,
      });
    }
    if (displayBlur) {
      animationRef.current?.restart();
    } else {
      animationRef.current?.reverse();
    }
  }, [displayBlur, shadowRef.current]);

  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") cleanupRef.current();
    };
  }, []);

  return (
    <div className={clx(container, props.className)}>
      <div
        ref={measureRef}
        data-has-list-wallets={getListShapeWallets().length > 0}
        className={walletList}
      >
        {showSquareShapeWallets() ? (
          <FadeIn isVisible={showSquareShapeWallets()}>
            <Box display="grid" className={squareWallets}>
              {props.wallets.slice(0, 2)?.map((wallet, index) => (
                <WalletButton
                  variant="square"
                  key={`${wallet.name}-${index}`}
                  name={wallet.prettyName ?? wallet.name}
                  logo={wallet.logo}
                  subLogo={wallet.subLogo}
                  btmLogo={wallet.btmLogo}
                  onClick={(event) =>
                    onWalletItemClickAsync(async () =>
                      props.onWalletItemClick?.(wallet.originalWallet)
                    )
                  }
                />
              ))}
            </Box>
          </FadeIn>
        ) : null}
        {getListShapeWallets().length > 0 ? (
          <FadeIn isVisible={getListShapeWallets().length > 0}>
            <Box display="grid" className={listWallets}>
              {getListShapeWallets()?.map((wallet, index) => (
                <WalletButton
                  variant="list"
                  key={`${wallet.name}-${index}`}
                  name={wallet.prettyName ?? wallet.name}
                  logo={wallet.logo}
                  badge={wallet.badge}
                  subLogo={wallet.subLogo}
                  btmLogo={wallet.btmLogo}
                  onClick={(event) =>
                    onWalletItemClickAsync(async () =>
                      props.onWalletItemClick?.(wallet.originalWallet)
                    )
                  }
                />
              ))}
            </Box>
          </FadeIn>
        ) : null}
      </div>
      <div ref={shadowRef} className={bottomShadow[internalTheme]} />
    </div>
  );
}

export default ConnectModalWalletList;
