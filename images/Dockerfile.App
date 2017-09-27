# Part 1: Build application
FROM aurokk/build AS build
WORKDIR /project

# Step 1: Copy application sources into container
COPY . .

# Step 2: Build application with cake
WORKDIR build

RUN ./build.sh \
# main (CAKE) params should have two dash sign
    --configuration Release \
    --script /project/build/application.cake \
# additional (SCRIPT) params should have one dash sign
    -runtime=debian.8-x64

# Part 2: Create application image
FROM aurokk/run
WORKDIR /app

ENV ASPNETCORE_URLS http://*:80

# Step 1: Copy application binaries
COPY --from=build /project/dist/app .

# Step 2: Run application
ENTRYPOINT ./IsomorphicSpa

# docker run -d -p 80:80 aurokk/app