CREATING THE PLAN:

What HTML pages do you need?
What is needed ON the page?

Look at each model:
  What variables does it need?
  What methods does it need? CRUD

Look at the validations, what validations do you need?





-----------------------------------
Login HTML
  model:
    User
  methods:
    create
    $location.path

Main Dashboard HTML
  Index of Topics with populated _user and _category
    show topic link
    show user link
  new topic form

Topic HTML
  _user
  title
  description
  populated posts
    * each post has populated comments
    * NEW_FORM for comment
  --------
  NEW_FORM for posts



User HTML
  User name
  topics.length
  posts.length
  comments.length