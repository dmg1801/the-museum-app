import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { ArtifactsService } from './artifacts.service';
import { Artifact } from './artifact.entity';

@Controller('artifacts')
export class ArtifactsController {
  constructor(private readonly artifactsService: ArtifactsService) {}

  @Get()
  findAll(): Promise<Artifact[]> {
    return this.artifactsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Artifact> {
    const artifact = await this.artifactsService.findOne(+id);
    if (!artifact) throw new NotFoundException('Artifact not found');
    return artifact;
  }

  @Post()
  create(@Body() artifactData: Partial<Artifact>): Promise<Artifact> {
    return this.artifactsService.create(artifactData);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() artifactData: Partial<Artifact>,
  ): Promise<Artifact> {
    return this.artifactsService.update(+id, artifactData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.artifactsService.remove(+id);
  }
}
