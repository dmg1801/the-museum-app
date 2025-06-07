import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artifact } from './artifacts/artifact.entity'
import { ArtifactsModule } from './artifacts/artifacts.module';
;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'arqueodb',
      entities: [Artifact],
      synchronize: true, // solo en desarrollo
      autoLoadEntities: true,
    }),
    ArtifactsModule,
  ],
})
export class AppModule {}
