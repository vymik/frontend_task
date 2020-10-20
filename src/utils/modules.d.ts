// Tells TypeScript to treat *.scss files like regular modules that can be imported
declare module '*.scss' {
    const value: {[key: string]: any};
    export = value;
}