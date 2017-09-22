# Application image

# Part 1: Build application
FROM aurokk/build
WORKDIR /src

# Step 1: Copy application sources into container
COPY . .

# Step 2: Build application with cake
RUN ./build/build.sh --script /src/build/scripts/application.cake

# Part 2: Create application image
FROM aurokk/run
WORKDIR /app

# Step 1: Copy application binaries