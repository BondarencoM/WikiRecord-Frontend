import { HttpErrorResponse } from '@angular/common/http';
import { PartialObserver } from 'rxjs';

export const expectSuccessWith = <T>(response: T): PartialObserver<T> => {
    return {
        next: (p: T) => expect(p).toEqual(response),
        error: (e: any) => fail(e || 'Observable error'),
    }
}

export const expectToFailWith = (error: unknown): PartialObserver<unknown> => {
    return {
        next: (p: unknown) => fail(p || 'Was expected to fail'),
        error: (e: unknown) => expect(e).toEqual(error),
    }
}

export const expectToFailWithHttpErrorEvent = (error: ErrorEvent): PartialObserver<unknown> => {
    return {
        next: (p: unknown) => fail(p || 'Was expected to fail'),
        error: (e: HttpErrorResponse) => expect(e.error).toEqual(error),
    }
}
