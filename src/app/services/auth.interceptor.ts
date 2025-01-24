import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const publicUrls = [
    { url: '/api/rooms', methods: ['GET']},
    { url: '/api/login', methods: ['POST']},
    { url: '/api/registetr', methods: ['POST']},
    { url: '/api/logout', methods: ['POST']},
   ]

  const isPublicRoute = publicUrls.some(
    (route) => req.url.includes(route.url) && route.methods.includes(req.method)
  );  

  if (isPublicRoute) {
    return next(req);
  } else {
    const clonedReq = req.clone({
      withCredentials: true,
    });
    return next(clonedReq);
  }
}
