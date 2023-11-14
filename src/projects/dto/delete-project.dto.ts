import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteProjectDto {
    @IsString({ message: 'Project ID must be a string' })
    @IsNotEmpty({ message: 'Project ID is required' })
    projectId: string;
}
