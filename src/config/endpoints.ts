import { z } from "zod";

export const endpoints = {
  login: {
    url: "/login",
    input: z.object({
      body: z.object({
        usuario: z.string(),
        senha: z.string(),
      }),
    }),
    output: z.object({
      success: z.boolean(),
      result: z.object({
        token: z.string(),
        uid: z.string(),
        name: z.string(),
        contextInfo: z.object({
          auth: z.object({
            profiles: z.array(z.string()),
            tasks: z.array(z.string()),
          }),
          contextClient: z.intersection(
            z.object({
              info: z.object({
                name: z.string(),
                cpf: z.string(),
                id: z.string(),
                cargo: z.string(),
              }),
              tasks: z.array(z.unknown()),
            }),
            z.record(
              z.object({
                name: z.string(),
                alias: z.string(),
                link: z.string(),
                profiles: z.array(
                  z.object({ alias: z.string(), name: z.string() })
                ),
              })
            )
          ),
        }),
      }),
      messages: z.array(z.unknown()),
    }),
  },
  certification: {
    url: "/cert/login",
    input: z.object({
      body: z.object({
        token: z.string(),
      }),
    }),
  },
  selfLogin: {
    url: "/credentials/auto-login",
  },
  changePassword: {
    url: "/credentials/change-password",
  },
};

export type CredentialsInput = z.infer<typeof endpoints.login.input>;
export type CredentialsOutput = z.infer<typeof endpoints.login.output>;
