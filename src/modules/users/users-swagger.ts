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
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },
};

export const getProfileRouteSchema: FastifySchema = {
  summary: 'Obter perfil',
  description: 'Retorna os dados do usuário autenticado.',
  tags: ['Users'],

  response: {
    200: {
      description: 'Perfil encontrado com sucesso.',
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

export const updateProfileRouteSchema: FastifySchema = {
  summary: 'Atualizar perfil',
  description: 'Atualiza o nome e/ou e-mail do usuário autenticado.',
  tags: ['Users'],

  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 2,
      },
      email: {
        type: 'string',
        format: 'email',
      },
    },
  },

  response: {
    200: {
      description: 'Perfil atualizado com sucesso.',
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

    401: unauthorizedResponse,

    500: internalErrorResponse,
  },
};

export const updatePasswordRouteSchema: FastifySchema = {
  summary: 'Alterar senha',
  description: 'Altera a senha do usuário autenticado.',
  tags: ['Users'],

  body: {
    type: 'object',
    required: ['currentPassword', 'newPassword'],
    properties: {
      currentPassword: {
        type: 'string',
        minLength: 1,
      },
      newPassword: {
        type: 'string',
        minLength: 6,
      },
    },
  },

  response: {
    200: {
      description: 'Senha alterada com sucesso.',
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
      description: 'Usuário não autenticado ou senha atual inválida.',
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
