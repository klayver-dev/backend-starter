import type { FastifySchema } from 'fastify';

const validationErrorResponse = {
  description: 'Dados inválidos.',
  type: 'object',
  properties: {
    message: {
      type: 'string',
    },
    errors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          field: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
        },
      },
    },
    data: {
      type: 'null',
    },
  },
};

const internalErrorResponse = {
  description: 'Erro interno do servidor.',
  type: 'object',
  properties: {
    message: {
      type: 'string',
    },
    data: {
      type: 'null',
    },
  },
};

const unauthorizedResponse = {
  description: 'Usuário não autenticado.',
  type: 'object',
  properties: {
    message: {
      type: 'string',
    },
    data: {
      type: 'null',
    },
  },
};

const userSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
    },
  },
};

export const registerRouteSchema: FastifySchema = {
  summary: 'Cadastrar usuário',
  description: 'Cria uma nova conta de usuário.',
  tags: ['Auth'],

  body: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
      name: {
        type: 'string',
        minLength: 3,
      },
      email: {
        type: 'string',
        format: 'email',
      },
      password: {
        type: 'string',
        minLength: 6,
      },
    },
  },

  response: {
    200: {
      description: 'Usuário cadastrado com sucesso.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
          properties: {
            user: userSchema,
          },
        },
      },
    },

    400: validationErrorResponse,

    500: internalErrorResponse,
  },
};

export const loginRouteSchema: FastifySchema = {
  summary: 'Realizar login',
  description: 'Autentica um usuário.',
  tags: ['Auth'],

  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
      },
      password: {
        type: 'string',
        minLength: 6,
      },
    },
  },

  response: {
    200: {
      description: 'Login realizado com sucesso.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
          properties: {
            user: userSchema,
          },
        },
      },
    },

    400: validationErrorResponse,

    401: {
      description: 'E-mail ou senha inválidos.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'null',
        },
      },
    },

    500: internalErrorResponse,
  },
};

export const meRouteSchema: FastifySchema = {
  summary: 'Obter usuário autenticado',
  description: 'Retorna os dados do usuário autenticado.',
  tags: ['Auth'],

  response: {
    200: {
      description: 'Usuário autenticado.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
          properties: {
            user: userSchema,
          },
        },
      },
    },

    401: unauthorizedResponse,

    500: internalErrorResponse,
  },
};

export const logoutRouteSchema: FastifySchema = {
  summary: 'Realizar logout',
  description: 'Remove o cookie de autenticação do usuário.',
  tags: ['Auth'],

  response: {
    200: {
      description: 'Logout realizado com sucesso.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'null',
        },
      },
    },

    500: internalErrorResponse,
  },
};

export const forgotPasswordRouteSchema: FastifySchema = {
  summary: 'Solicitar redefinição de senha',
  description: 'Envia um link para redefinição de senha por e-mail.',
  tags: ['Auth'],

  body: {
    type: 'object',
    required: ['email'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
      },
    },
  },

  response: {
    200: {
      description: 'Solicitação processada.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'null',
        },
      },
    },

    400: validationErrorResponse,

    500: internalErrorResponse,
  },
};

export const resetPasswordRouteSchema: FastifySchema = {
  summary: 'Redefinir senha',
  description: 'Redefine a senha utilizando um token de recuperação.',
  tags: ['Auth'],

  body: {
    type: 'object',
    required: ['token', 'password'],
    properties: {
      token: {
        type: 'string',
      },
      password: {
        type: 'string',
        minLength: 6,
      },
    },
  },

  response: {
    200: {
      description: 'Senha redefinida com sucesso.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'null',
        },
      },
    },

    400: validationErrorResponse,

    401: {
      description: 'Token inválido ou expirado.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'null',
        },
      },
    },

    500: internalErrorResponse,
  },
};
