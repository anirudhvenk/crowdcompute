// const express = require('express');
// const os = require('os');
// const ps = require('ps-node');

// const app = express();
// const port = 3000;

// app.get('/get_system_info', (req, res) => {
    // const systemInfo = {
    //     CPU: {
    //         cores: os.cpus().length,
    //         model: os.cpus()[0].model,
    //         speed: os.cpus()[0].speed,
    //     },
    //     GPU: {
    //         name: 'N/A', // GPU information is more complex and platform-dependent; you may need to use additional libraries or commands to obtain this information
    //         memory: 0,
    //     },
    //     RAM: {
    //         total: os.totalmem(),
    //         free: os.freemem(),
    //     },
    //     Disk: {
    //         total: 0, // Disk information can vary across platforms; you may need to use additional libraries or commands to obtain this information
    //         free: 0,
    //     },
    //     OS: {
    //         platform: os.platform(),
    //         release: os.release(),
    //         architecture: os.arch(),
    //     },
    //     Network: {
    //         latency: 0, // You may need to use additional libraries or commands to obtain network latency information
    //         bandwidth: 0, // You may need to use additional libraries or commands to obtain network bandwidth information
    //     },
    //     Utilization: {
    //         CPU: os.loadavg()[0] / os.cpus().length * 100, // CPU utilization can be obtained using operating system-specific commands or libraries
    //         GPU: process.gpuUsage(), // GPU utilization can be obtained using operating system-specific commands or libraries
    //         memory: 0, // Memory utilization can be obtained using operating system-specific commands or libraries
    //     },
    // };

//     res.json(systemInfo);
// });

// app.listen(port, () => {
//     console.log(`Server is listening at http://localhost:${port}`);
// });
