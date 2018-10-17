class ArticleController < ApplicationController
  def new
    @Article = Article.new
    @Article.save
    redirect_to edit_article_path(@Article)

    # "/article/#{@Article.id}/edit"
  end

  def update
    a = Article.find(params[:id])
    a.text = params[:text]
    #md_to_html("#hihihi")
    render partial: 'ajax_text', locals: { text: a.text}
  end

  def upload_image
    a = Article.find(params[:id])
    #  byebug
    a.image =  params[:file]
    a.save
    url = a.image.url
    render json: { url: url }
  end
end
