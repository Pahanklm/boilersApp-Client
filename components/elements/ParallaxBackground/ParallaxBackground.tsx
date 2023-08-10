import React, { useEffect } from 'react';
import Parallax from 'parallax-js';

const ParallaxBackground = () => {
    useEffect(() => {
        const scene = document.getElementById('scene');

        if (scene) {
            const parallaxInstance = new Parallax(scene);

            return () => {
                parallaxInstance.destroy();
            };
        }
    }, []);

    return (
        <div id="scene" className="scene" data-hover-only="false">
            <div className="circle" data-depth="1.2" />
            <div className="one" data-depth="0.9">
                <div className="content">
                    <span className="piece" />
                    <span className="piece" />
                    <span className="piece" />
                </div>
            </div>
            <div className="two" data-depth="0.60">
                <div className="content">
                    <span className="piece" />
                    <span className="piece" />
                    <span className="piece" />
                </div>
            </div>
            <div className="three" data-depth="0.40">
                <div className="content">
                    <span className="piece" />
                    <span className="piece" />
                    <span className="piece" />
                </div>
            </div>
            <p className="p404" data-depth="0.50">
                404
            </p>
            <p className="p404" data-depth="0.10">
                404
            </p>
        </div>
    );
};

export default ParallaxBackground;
