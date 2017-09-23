# Application image

# Part 1: Build application
FROM aurokk/build AS build
WORKDIR /project

# Step 1: Copy application sources into container
COPY . .

# Step 2: Build application with cake
RUN ./build/build.sh --script /project/build/scripts/application.cake --runtime=debian.8-x64

# Part 2: Create application image
FROM aurokk/run
WORKDIR /app

ENV ASPNETCORE_URLS http://+:80

# Step 1: Copy application binaries
COPY --from=build /project/dist/app .

# Step 2: Run application
ENTRYPOINT ./IsomorphicSpa