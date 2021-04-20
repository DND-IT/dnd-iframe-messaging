declare module '@dnd-it/dnd-iframe-messaging/parent' {
  const init: () => void;
  const register: (handlers: {autofit: (message: { contentHeight?: number }) => void}, refresh: (id: string) => void) => string;
  const unregister: (id?: string) => void;
}
