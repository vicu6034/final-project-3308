CREATE TABLE IF NOT EXISTS reviewsTab (
    reviewID int PRIMARY KEY,
    movieTitle VARCHAR (40) NOT NULL,
    review VARCHAR(255),
    reviewDate Date NOT NULL
);