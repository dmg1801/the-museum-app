import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtifactsService } from './artifacts.service';
import { ArtifactsController } from './artifacts.controller';
import { Artifact } from './artifact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artifact])],
  providers: [ArtifactsService],
  controllers: [ArtifactsController],
})
export class ArtifactsModule {}
