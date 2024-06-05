import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'El nombre del usuario, debe tener como mínimo 3 caracteres',
    example: 'Fabrizio',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'El email del usuario, debe ser un email válido',
    example: 'example@gmail.com',
  })
  email: string;

  /**
   * La contraseña, debe ser una contaseña dificil de encontrar
   * @example Strong!(Password
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;

  @IsEmpty()
  @ApiProperty({
    description:
      'Asignada por default al momento de crear el usuario, no debe ser incluida en el body',
    default: false,
  })
  isAdmin: boolean;
}
