class MetricsController < ApplicationController
  def index
    @metrics = Metric.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @metrics }
    end
  end

  def show
    @metric = Metric.find(params[:id])
    render json: @metric
  end

  def create
    @metric = Metric.new(params[:metric])

    if @metric.save
      render json: @metric, status: :created, location: @metric
    else
      render json: @metric.errors, status: :unprocessable_entity
    end
  end

  def update
    @metric = Metric.find(params[:id])
    if @metric.update_attributes(params[:metric])
      render json: nil, status: :ok
    else
      render json: @metric.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @metric = Metric.find(params[:id])
    if @metric.destroy
      render json: nil, status: :ok
    else
      render json: @metric.errors, status: :unprocessable_entity
    end
  end
end
