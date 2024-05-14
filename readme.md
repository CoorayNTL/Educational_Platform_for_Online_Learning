# Deployment Guide:

## Prerequisites:
1. An AWS account with necessary permissions to create resources in Amazon EKS.
2. AWS CLI installed and configured on your local machine.
3. kubectl installed on your local machine.
4. Helm installed on your local machine.
5. Docker installed on your local machine.

## Deployment Steps:

1. Clone the repository containing the microservice project:

   git clone <repository_url>
   cd <repository_folder>

2. Build Docker images for your Node.js application:

   docker build -t <dockerhub_username>/<image_name>:<tag> .

3. Push the Docker images to your Docker Hub repository:

   docker login
   docker push <dockerhub_username>/<image_name>:<tag>

4. Configure your Kubernetes cluster to use AWS EKS:

   aws eks --region <region> update-kubeconfig --name <cluster_name>

5. Install Helm chart for MongoDB:

   helm repo add bitnami https://charts.bitnami.com/bitnami
   helm install mongodb bitnami/mongodb

6. Install Helm chart for RabbitMQ:

   helm repo add bitnami https://charts.bitnami.com/bitnami
   helm install rabbitmq bitnami/rabbitmq

7. Update the Helm chart values for your microservice:

   Edit the values.yaml file in the Helm chart directory to configure your microservice deployment settings such as image repository, port, environment variables, etc.

8. Install Helm chart for your microservice:

   helm install <release_name> <path_to_microservice_chart_directory>

9. Verify the deployment:

   kubectl get pods

10. Access your microservice:

    Use the external IP or load balancer provided by AWS EKS to access your microservice.

11. (Optional) Set up horizontal pod autoscaling and load balancing:

    Configure HorizontalPodAutoscaler and Ingress resources in Kubernetes to automatically scale your microservice based on CPU utilization and expose it to the internet.

12. (Optional) Set up monitoring and logging:

    Configure tools like Prometheus, Grafana, and ELK stack to monitor and log the performance and activities of your microservice in the Kubernetes cluster.

13. (Optional) Set up CI/CD pipeline:

    Implement a CI/CD pipeline using tools like Jenkins, GitLab CI/CD, or AWS CodePipeline to automate the deployment process of your microservice.
