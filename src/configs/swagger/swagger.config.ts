import { DocumentBuilder } from '@nestjs/swagger';


export const swaggerConfig = new DocumentBuilder()
.setTitle('Crud_Nest_Mongo')
.setDescription('CRUD Operation With Nest.js And MongoDb ')
.setVersion('1.0')
.build();
