FROM ruby:2.7

# Note: python2 may be required to build node-gyp depending on the platform
RUN apt-get update \
  && apt-get install -y nodejs npm \
  && apt-get install -y python2.7 \
  && npm install --global yarn \
  && gem install bundler:1.17.2

