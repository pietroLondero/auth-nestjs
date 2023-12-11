import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "secret-2",
            passReqToCallback: true
        });
    }
    async validate(req: Request, payload: any) {
        const refreshToken = req.get('authorization').replace('Bearer ', '').trim();
        return {
            ...payload,
            refreshToken
        };
    }


}
