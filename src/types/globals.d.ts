/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly MAILERLITE_API_KEY: string
    readonly MAILERLITE_GROUP_ID: string
  }
}
