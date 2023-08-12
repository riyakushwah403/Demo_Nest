import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user.service'; // Import your UserService
import { UserRole } from '../Enum/userRole';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';


@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token');
    }

    const token = authHeader.substring(7);
    try {
      const decoded = this.jwtService.verify(token);
      console.log(decoded);
      
      const userId = decoded.sub; 
      console.log(userId);
      
      const user = await this.userService.findById(userId); 

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      request.user = user; 
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}


@Injectable()
export class AdminAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);
    
console.log(user.role);

    if (!user || user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException('Unauthorized.');
    }

    return true;
  }
}

