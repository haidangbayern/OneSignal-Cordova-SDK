var fs = require('fs'),
    path = require('path');


module.exports = function(context) {
    return new Promise(function(resolve) {
        var projectRoot = context.opts.projectRoot;
        var config = path.join(projectRoot, 'platforms', 'ios', 'Podfile.lock');
        var podfile = path.join(projectRoot, 'platforms', 'ios', 'Podfile');
        var xcodeproj = path.join(projectRoot, 'platforms', 'ios', 'Pods', 'Pods.xcodeproj');
        var content = ` post_install do |installer|; installer.pods_project.targets.each do |target|; if target.name == "RxSwift"; target.build_configurations.each do |config|; if config.name == "Debug"; config.build_settings['SWIFT_ACTIVE_COMPILATION_CONDITIONS'] = []; end; end; end; end; end;`

        console.log('RessssadPod Lock ' + config);
        console.log('ReadPod ' + podfile);
        console.log('ReadPod xcodeproj ' + xcodeproj);

        if (fs.existsSync(config)) {

        }
        else {
            config = path.join(projectRoot, 'platforms', 'ios', 'Podfile');
        }

        console.log('ReadPod Lock' + config);

        if (fs.existsSync(config)) {
            console.log('ReadPod Lock');
            fs.readFile(config, 'utf8', function (err, data) {                            
                if (err) {
                    throw new Error('Unable to find Podfile: ' + err);
                }
                console.log('ReadPod Lock'+ data);
                
            });
        }

        if (fs.existsSync(podfile)) {
            console.log('ReadPod');
            fs.readFile(podfile, 'utf8', function (err, data) {                            
                if (err) {
                    throw new Error('Unable to find Podfile: ' + err);
                }
                console.log('ReadPod '+ data);

                var filecontent = data.concat(content); 

                console.log('Read content '+ content);
                filecontent = filecontent.replace(/platform :ios, '11.0'/g, 'platform :ios, \'13\'')
                filecontent = filecontent.replace(/platform :ios, '12.0'/g, 'platform :ios, \'13\'')
                filecontent = filecontent.replace(/platform :ios, '11'/g, 'platform :ios, \'13\'')
                filecontent = filecontent.replace(/platform :ios, '12'/g, 'platform :ios, \'13\'')

                fs.writeFile(podfile, filecontent, function (err) {
                  if (err) {
                    throw new Error('Unable to find Podfile: ' + err);
                  }
                  //file written successfully
                  
                });     
            });
            
        }


        if (fs.existsSync(xcodeproj)) {
            console.log('ReadPod');
            fs.readFile(xcodeproj, 'utf8', function (err, data) {                            
                if (err) {
                    console.log('Unable '+ data);
                    //throw new Error('Unable to find xcodeproj: ' + err);
                }
                console.log('xcodeproj '+ data);
                
            });
        }

        return resolve();
    });
}