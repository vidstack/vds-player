export declare type Constructor<T = object> = {
    new (...args: any[]): T;
    prototype: T;
};
export declare type KeysOfType<T, O> = {
    [P in keyof O]: O[P] extends T ? P : never;
};
export declare type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;
export declare type Values<T> = T extends {
    [k: string]: infer V;
} ? V : never;
export declare type ReadonlyIfType<T, O> = Readonly<Omit<O, Exclude<keyof O, Values<KeysOfType<T, O>>>>> & Omit<O, keyof Omit<O, Exclude<keyof O, Values<KeysOfType<T, O>>>>>;
export declare type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;
export declare type WritableKeys<T> = {
    [P in keyof T]-?: IfEquals<{
        [Q in P]: T[P];
    }, {
        -readonly [Q in P]: T[P];
    }, P>;
}[keyof T];
export declare type ReadonlyKeys<T> = {
    [P in keyof T]-?: IfEquals<{
        [Q in P]: T[P];
    }, {
        -readonly [Q in P]: T[P];
    }, never, P>;
}[keyof T];
