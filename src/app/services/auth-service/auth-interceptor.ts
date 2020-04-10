import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
            const authRequest = req.clone({
                headers: req.headers.set('Authorization', 'Bearer' + accessToken)
            });
            return next.handle(authRequest);
        }
        return next.handle(req);
    }

}
