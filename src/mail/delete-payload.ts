import { IsString } from 'class-validator';

export class DeleteBody {
  @IsString()
  readonly token: string;
}
