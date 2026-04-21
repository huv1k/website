type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}

interface Window {
  seline?: {
    track: (event: string, data?: Record<string, unknown>) => void;
  };
}
