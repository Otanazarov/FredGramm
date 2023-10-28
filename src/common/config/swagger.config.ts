import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
.setTitle('Macgram')
.setDescription(' API for writing posts')
.setVersion('1.0')
.addTag('endpoints')
.build();