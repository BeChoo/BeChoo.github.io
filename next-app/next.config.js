module.exports = {
    // Testing removing trailing slashes in all code
    async rewrites() {
        return [
            {
                source: '/api/:path*/',
                destination: '/api/:path*',
            }
        ]
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: '/api/:path*',
                // "/api/city",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            },
            // {
            //     source: "/api/hotelDetails",
            //     headers: [
            //         { key: "Access-Control-Allow-Credentials", value: "true" },
            //         { key: "Access-Control-Allow-Origin", value: "*" },
            //         { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
            //         { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            //     ]
            // },
            // {
            //     source: "/api/hotelOffers",
            //     headers: [
            //         { key: "Access-Control-Allow-Credentials", value: "true" },
            //         { key: "Access-Control-Allow-Origin", value: "*" },
            //         { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
            //         { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            //     ]
            // },
            // {
            //     source: "/api/hotels",
            //     headers: [
            //         { key: "Access-Control-Allow-Credentials", value: "true" },
            //         { key: "Access-Control-Allow-Origin", value: "*" },
            //         { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
            //         { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            //     ]
            // }
        ]
    }
};
