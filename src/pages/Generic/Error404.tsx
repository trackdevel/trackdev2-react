import React from "react";


const Error404 = () => {

    /*
    <div style="display:flex;align-items:center;justify-content:center;height:100vh">
            <div>
                <style>body{color:#000;background:#fff;margin:0}.next-error-h1{border - right:1px solid rgba(0,0,0,.3)}@media
                    (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}</style>
                <h1 className="next-error-h1"
                    style="display:inline-block;margin:0 20px 0 0;padding:0 23px 0 0;font-size:24px;font-weight:500;vertical-align:top;line-height:49px">404</h1>
                <div style="display:inline-block"><h2
                    style="font-size:14px;font-weight:400;line-height:49px;margin:0">This page could not be found.</h2>
                </div>
            </div>
        </div>
     */

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center space-y-4">
                <h1 className="text-2xl font-semibold tracking-tight">
                    404
                </h1>
                <p className="text-sm text-muted-foreground">
                    Aquesta pàgina no existeix
                </p>
            </div>
        </div>
    );

}

export default Error404;
