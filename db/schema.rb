# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160323084824) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: true do |t|
    t.string   "data",                    default: ""
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id",                                                                   null: false
    t.integer  "question_id",                                                               null: false
    t.string   "result",      limit: 512, default: "{\"correct\":\"false\",\"errors\":[]}"
  end

  create_table "lectures", force: true do |t|
    t.string   "name",                         null: false
    t.string   "code"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "author_id",                    null: false
    t.string   "color",      default: "green"
  end

  create_table "questions", force: true do |t|
    t.string   "title",          null: false
    t.string   "subtitle"
    t.string   "data",           null: false
    t.integer  "type",           null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "sheet_id",       null: false
    t.string   "correct_answer", null: false
    t.string   "model_answer",   null: false
  end

  create_table "sheets", force: true do |t|
    t.string   "name",                        null: false
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "lecture_id",                  null: false
    t.boolean  "live",        default: false
    t.boolean  "released",    default: false
  end

  create_table "statistics", force: true do |t|
    t.integer  "question_id"
    t.integer  "answer_id",   null: false
    t.string   "data",        null: false
    t.integer  "kind",        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "subscriptions", force: true do |t|
    t.integer  "lecture_id", null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
