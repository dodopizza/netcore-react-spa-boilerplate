# Application image

# Part 1: Build application
FROM aurokk/build AS build
WORKDIR /project

# Step 1: Copy application sources into container
COPY . .

# Step 2: Build application with cake
RUN ./build/build.sh --configuration Debug --script /project/build/scripts/application.cake -runtime=debian.8-x64

# Part 2: Create application image
FROM aurokk/run
WORKDIR /app

ENV ASPNETCORE_URLS http://+:80

# Step 1: Copy application binaries
COPY --from=build /project/dist/app .

# Step tmp: Set up debugger
RUN set -x \
    && apt-get update \
    && apt-get install -y procps curl unzip --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sSL https://aka.ms/getvsdbgsh | bash /dev/stdin -v latest -l /vsdbg

# Step 2: Run application
ENTRYPOINT ./IsomorphicSpa

# docker build -t aurokk/app -f Dockerfile.App ..
# docker run -d -p 5000:80 aurokk/app