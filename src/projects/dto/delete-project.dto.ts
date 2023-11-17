import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteProjectDto {
    @IsString({ message: 'Project must be a string' })
    @IsNotEmpty({ message: 'Project is required' })
    projectId: string;
}
