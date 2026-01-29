# Stage 1: Build (Changed to 10.0)
FROM mcr.microsoft.com/dotnet/sdk:10.0-preview AS build
WORKDIR /src

COPY ["CartService.csproj", "."]
RUN dotnet restore "CartService.csproj"

COPY . .
RUN dotnet build "CartService.csproj" -c Release -o /app/build

# Stage 2: Publish
FROM build AS publish
RUN dotnet publish "CartService.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 3: Runtime (Changed to 10.0)
FROM mcr.microsoft.com/dotnet/aspnet:10.0-preview AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENV ASPNETCORE_URLS=http://+:5232
EXPOSE 5232

ENTRYPOINT ["dotnet", "CartService.dll"]