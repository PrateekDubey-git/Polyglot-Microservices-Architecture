FROM nginx:1.25-alpine

# remove default config
RUN rm /etc/nginx/conf.d/default.conf

# add our gateway config
COPY gateway.conf /etc/nginx/conf.d/gateway.conf

