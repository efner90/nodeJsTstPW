import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Column } from './entities/column.entity';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Column])],
  providers: [ColumnsService],
  controllers: [ColumnsController],
})
export class ColumnsModule {}