import isObject from "lodash/isObject";
import type { Children } from "../../models/components.model";
import {
  ExternalToast,
  Toast,
  PromiseData,
  PromiseLike,
  ToastToDismiss,
  ToastType,
  ToastPromiseMessage,
  ToastPromiseFrame,
} from "./toast.types";

let toastsCounter = 0;

export type ToastItemState = Toast | ToastToDismiss;
export type ToastsState = Array<ToastItemState>;
export type StateSetter = (oldState: ToastsState) => ToastsState;

class Observer {
  subscribers: Array<
    (toast: ExternalToast | ToastToDismiss, latestToasts: ToastsState) => void
  >;
  toasts: ToastsState;
  displayToasts: ToastsState;
  displaySubscribers: Array<(latestToasts: ToastsState) => void>;

  constructor() {
    this.subscribers = [];
    this.toasts = [];
    this.displayToasts = [];
    this.displaySubscribers = [];
  }

  subscribe = (
    subscriber: (toast: ToastItemState, latestToasts: ToastsState) => void
  ) => {
    this.subscribers.push(subscriber);

    return () => {
      const index = this.subscribers.indexOf(subscriber);
      this.subscribers.splice(index, 1);
    };
  };

  publish = (data: Toast) => {
    this.subscribers.forEach((subscriber) =>
      subscriber(data, this.displayToasts)
    );
  };

  // Because mitosis cannot understand/compile useState with callback signature yet
  // .ie setState(oldState => ...)
  // calling setState many times to update toasts state in Toaster
  // after an event is emitted will result in batching,
  // meaning no matter how many times you call state.toasts = <new_state>
  // only 1 toast will ever be in toasts state.
  // This function is a detour to make sure state is updated correctly
  syncDisplayToasts = (toastsOrSetterFn: ToastsState | StateSetter) => {
    if (typeof toastsOrSetterFn === "function") {
      this.displayToasts = toastsOrSetterFn(this.displayToasts);
    } else {
      this.displayToasts = toastsOrSetterFn;
    }
    this.publishDisplay();
  };

  subscribeDisplay = (subscriber: (latestToasts: ToastsState) => void) => {
    this.displaySubscribers.push(subscriber);

    return () => {
      const index = this.displaySubscribers.indexOf(subscriber);
      this.displaySubscribers.splice(index, 1);
    };
  };

  publishDisplay = () => {
    this.displaySubscribers.forEach((subscriber) =>
      subscriber(this.displayToasts)
    );
  };

  addToast = (data: Toast) => {
    this.publish(data);
    this.toasts = [...this.toasts, data];
  };

  create = (
    data: ExternalToast & {
      message?: string | Children;
      type?: ToastType;
    }
  ) => {
    const { message, ...rest } = data;
    const id =
      typeof data?.id === "number" || data.id?.length > 0
        ? data.id
        : toastsCounter++;
    const alreadyExists = this.toasts.find((toast) => {
      return toast.id === id;
    });

    if (alreadyExists) {
      this.toasts = this.toasts.map((toast) => {
        if (toast.id === id) {
          this.publish({ ...toast, ...data, id, title: message });
          return { ...toast, ...data, id, title: message };
        }

        return toast;
      });
    } else {
      this.addToast({ title: message, ...rest, id });
    }

    return id;
  };

  dismiss = (id?: number | string) => {
    if (!id) {
      this.toasts.forEach((toast) => {
        this.subscribers.forEach((subscriber) =>
          subscriber({ id: toast.id, dismiss: true }, this.toasts)
        );
      });
    }

    this.subscribers.forEach((subscriber) =>
      subscriber({ id, dismiss: true }, this.toasts)
    );

    return id;
  };

  message = (message: string | Children, data?: ExternalToast) => {
    return this.create({ ...data, message });
  };

  error = (message: string | Children, data?: ExternalToast) => {
    return this.create({ ...data, message, type: "error" });
  };

  success = (message: string | Children, data?: ExternalToast) => {
    return this.create({ ...data, type: "success", message });
  };

  custom = (
    type: ToastType,
    message: string | Children,
    data?: ExternalToast
  ) => {
    return this.create({ ...data, type: type, message });
  };

  promise = <ToastData>(
    promise: PromiseLike<ToastData>,
    data?: PromiseData<ToastData>
  ) => {
    const id = this.create({
      ...data,
      promise,
      type: "loading",
      message: data.loading,
    });

    const p = promise instanceof Promise ? promise : promise();

    const isFrame = (data: ToastPromiseMessage | ToastPromiseFrame) => {
      return (
        isObject(data) &&
        typeof (data as ToastPromiseFrame)?.toastType === "string"
      );
    };

    p.then((promiseData) => {
      const message =
        typeof data.success === "function"
          ? data.success(promiseData)
          : data.success;

      if (isFrame(message)) {
        const { message: frameMessage, toastType: frameType } =
          message as ToastPromiseFrame;
        this.create({ id, type: frameType, message: frameMessage });
      } else {
        this.create({
          id,
          type: "success",
          message: message as ToastPromiseMessage,
        });
      }
    }).catch((error) => {
      const message =
        typeof data.error === "function" ? data.error(error) : data.error;
      this.create({ id, type: "error", message });
    });

    return id;
  };
}

export const ToastState = new Observer();

const toastFunction = (message: string | Children, data?: ExternalToast) => {
  const id = data?.id || toastsCounter++;

  ToastState.addToast({
    title: message,
    ...data,
    id,
  });
  return id;
};

const basicToast = toastFunction;

export const toast = Object.assign(basicToast, {
  success: ToastState.success,
  error: ToastState.error,
  message: ToastState.message,
  promise: ToastState.promise,
  dismiss: ToastState.dismiss,
  custom: ToastState.custom,
});
