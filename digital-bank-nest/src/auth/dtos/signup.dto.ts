import {
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'

export class SignUpDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(8, {
    message: 'Password must be at least 8 characters',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string

  @IsString()
  @IsNotEmpty()
  @MinLength(2, {
    message: 'First name must have at least 2 characters',
  })
  firstName: string

  @IsString()
  @IsNotEmpty()
  @MinLength(2, {
    message: 'Last name must have at least 2 characters',
  })
  lastName: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(50, {
    message: 'Address must not have more than 50 characters',
  })
  address: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(50, {
    message: 'City must not have more than 50 characters',
  })
  city: string

  @IsString()
  @IsNotEmpty()
  @Length(2, 2, {
    message: 'State must have exactly 2 characters',
  })
  state: string

  @IsString()
  @IsNotEmpty()
  @Length(8, 8, {
    message: 'Postal code must have exactly 8 characters',
  })
  @Matches(/^\d+$/, {
    message: 'Postal code must only contain numbers and no special characters',
  })
  postalCode: string

  @IsISO8601(
    {},
    {
      message:
        'Date of birth must be in ISO format with time (YYYY-MM-DDTHH:mm:ss.sssZ)',
    },
  )
  @IsNotEmpty()
  dateOfBirth: Date

  @IsString()
  @IsNotEmpty()
  @Length(11, 11, {
    message: 'SSN must be exactly 11 digits,',
  })
  @Matches(/^\d+$/, {
    message: 'SSN must contain only numbers',
  })
  ssn: string
}
