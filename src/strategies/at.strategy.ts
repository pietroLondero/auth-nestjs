import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.AT_SECRET_JWT || "secret"
        });
    }
    async validate(payload: any) {
        return payload;
    }


}