# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Player.destroy_all

Player.create :nickname => 'Tony', :score => 6, :email => 'tony@tony', :password => 'tony'
Player.create :nickname => 'Anna', :score => 12, :email => 'anna@anna', :password => 'anna'
Player.create :nickname => 'John', :score => 10, :email => 'john@john', :password => 'john'
