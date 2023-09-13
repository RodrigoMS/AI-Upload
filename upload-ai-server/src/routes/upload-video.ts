import { FastifyInstance } from "fastify";
import { fastifyMultipart } from "@fastify/multipart";
import path from "node:path";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import { prisma } from "../lib/prisma";

// Módulos internos do node
// path, fs, crypto, http, util, stream

// O Node guarda o arquivo em disco e não na memória.
// pipeline  - Aguardar o processo de upload terminar.
// promisify - Usado para funções antigas do node que não permitem o uso de "async await".
const pump = promisify(pipeline)

export async function uploadVideoRoute(app: FastifyInstance) {

  // Define o tamanho do arquivo 
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1_048_576 * 25 // 25mb
    }
  })

  // reply - Retorna um resultado.
  app.post('/videos', async (request, reply) => {
    const data = await request.file()

    // Fez uma requisição para esta rota sem arquivo
    if (!data) {
      return reply.status(400).send({ error: 'Missing file input.' })
    }

    const extension = path.extname(data.filename)

    // O navegador vai extrair o audio do video antes de enviar para o servidor
    // Caso não seja um arquivo MP3 não será permitido
    if (extension !== '.mp3') {
      return reply.status(400).send({ error: 'Invalid input type, please upload a MP3.' })
    }

    // Retorna o nome do arquivo sem a extensão.
    const fileBaseName = path.basename(data.filename, extension)

    // Cria um novo node para o arquivo.
    const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`

    // Qual pasta vai salvar o arquivo.
    const uploadDestination = path.resolve(__dirname, '../../tmp',  fileUploadName)

    // Aguardar o upload do arquivo.
    await pump(data.file, fs.createWriteStream(uploadDestination))

    // Adiciona as informações do video no banco de dados.
    const video = await prisma.video.create({
      data: {
        name: data.filename,
        path: uploadDestination
      }
    })

    return {
      video
    }
  })
}
