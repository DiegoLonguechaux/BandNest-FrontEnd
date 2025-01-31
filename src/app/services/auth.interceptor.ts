import { HttpInterceptorFn, HttpXsrfTokenExtractor } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject( HttpXsrfTokenExtractor).getToken();
    
    const clonedReq = req.clone({
      withCredentials: true,
      setHeaders: { 
        'Accept' : 'application/json', 
        'X-Requested-With': 'XMLHttpRequest', 
        'X-XSRF-TOKEN': token ? token : '', 
      }
    });
    return next(clonedReq);
}
