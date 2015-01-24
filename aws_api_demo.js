var AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';
var ec2 = new AWS.EC2();
var params = {
  ImageId: 'ami-b5a7ea85', // Amazon Linux 
  InstanceType: 't2.micro',
  MinCount: 1, MaxCount: 1
};
var instanceName='Priyanka Instance'
// Create the instance
ec2.runInstances(params, function(err, data) {
  if (err) { console.log("Could not create instance", err); return; }

  var instanceId = data.Instances[0].InstanceId;
  console.log("Created instance", instanceId);

  // Add tags to the instance
  params = {Resources: [instanceId], Tags: [
    {Key: 'Name', Value: instanceName}
  ]};
  ec2.createTags(params, function(err) {
    console.log("Tagging instance", err ? "failure" : "success");
  });
});