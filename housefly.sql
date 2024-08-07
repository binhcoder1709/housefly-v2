-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th8 07, 2024 lúc 09:54 AM
-- Phiên bản máy phục vụ: 8.0.30
-- Phiên bản PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `housefly`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `albums`
--

CREATE TABLE `albums` (
  `album_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `album_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `album_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `artist_id` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `artists`
--

CREATE TABLE `artists` (
  `artist_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `artist_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `artist_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bio` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `artists`
--

INSERT INTO `artists` (`artist_id`, `artist_name`, `artist_image`, `bio`, `created_at`) VALUES
('021dc32a-4cc7-11ef-b561-841b77d63d09', 'Win', 'a', 'a', '2024-07-28 09:51:48'),
('ad808d65-4ca6-11ef-b561-841b77d63d09', 'Thái Hoàng', 'dd', 'dđ', '2024-07-28 06:00:23');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `artist_song`
--

CREATE TABLE `artist_song` (
  `artist_song_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `artist_id` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `song_id` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `artist_song`
--

INSERT INTO `artist_song` (`artist_song_id`, `artist_id`, `song_id`) VALUES
('643d03a4-fe24-49e6-8d79-4d768e852ec6', '021dc32a-4cc7-11ef-b561-841b77d63d09', '9bb0140c-ac90-428a-b464-9682ab6438d3'),
('8aa8818f-913b-4972-83d2-2863523c732f', 'ad808d65-4ca6-11ef-b561-841b77d63d09', 'd6b2c0de-a6ae-4906-8790-ea322bf1fda4'),
('a3cc0489-dcd5-400a-ae67-a5991948de7a', 'ad808d65-4ca6-11ef-b561-841b77d63d09', '9bb0140c-ac90-428a-b464-9682ab6438d3'),
('abe3567e-d480-43a1-b114-52661c914e15', '021dc32a-4cc7-11ef-b561-841b77d63d09', 'dfec67c6-13cc-4ad6-8fce-eb626958e2ac');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `genres`
--

CREATE TABLE `genres` (
  `genre_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `genre_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `genres`
--

INSERT INTO `genres` (`genre_id`, `genre_name`, `description`, `created_at`) VALUES
('fdffc199-4ca8-11ef-b561-841b77d63d09', 'Vinahouse', 'a', '2024-07-28 06:16:57');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `order_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_amount` int NOT NULL DEFAULT '0',
  `is_paid` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `plan_id` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`order_id`, `order_name`, `total_amount`, `is_paid`, `created_at`, `user_id`, `plan_id`) VALUES
('58e1ff5c-5479-11ef-b7bd-841b77d63d09', 'Thanh toán đơn hàng cho user ...', 100000, 0, '2024-08-07 04:56:03', 'cb56e9a9-e9e7-4034-8ee0-dcfd03dbf7bb', '1a9d8e64-5479-11ef-b7bd-841b77d63d09');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `plans`
--

CREATE TABLE `plans` (
  `plan_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `plan_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  `time_active` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `plans`
--

INSERT INTO `plans` (`plan_id`, `plan_name`, `price`, `time_active`) VALUES
('1a9d8e64-5479-11ef-b7bd-841b77d63d09', 'Gói nghe nhạc 1 tháng', 100000, 30);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `playlists`
--

CREATE TABLE `playlists` (
  `playlist_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `playlist_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discription` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_private` tinyint NOT NULL DEFAULT '0',
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `playlist_song`
--

CREATE TABLE `playlist_song` (
  `playlist_song_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `song_id` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `playlist_id` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `songs`
--

CREATE TABLE `songs` (
  `song_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `song_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `song_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `song_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `song_duration` int NOT NULL,
  `genre_id` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `songs`
--

INSERT INTO `songs` (`song_id`, `song_name`, `song_image`, `song_path`, `song_duration`, `genre_id`, `created_at`) VALUES
('9bb0140c-ac90-428a-b464-9682ab6438d3', 'On The Flow Remix', 'https://firebasestorage.googleapis.com/v0/b/housefly-d7265.appspot.com/o/music_images%2Fartworks-nnzk6HONko4KnLBt-PiY5iA-t500x500.jpg?alt=media&token=f26d4b05-a41a-4749-a020-d44f8cf071c8', 'https://firebasestorage.googleapis.com/v0/b/housefly-d7265.appspot.com/o/musics%2FOn%20The%20Flow%20-%20Win%20Remix.mp3?alt=media&token=3ebefccc-76ff-436e-8915-2a1f25a29d6c', 276, 'fdffc199-4ca8-11ef-b561-841b77d63d09', '2024-08-04 15:45:58'),
('d6b2c0de-a6ae-4906-8790-ea322bf1fda4', 'We Are Love Remix', 'https://firebasestorage.googleapis.com/v0/b/housefly-d7265.appspot.com/o/music_images%2Fartworks-y196jSKjypoTLZbP-xZNRkw-t240x240.jpg?alt=media&token=3e0a80b0-bbc6-4078-b081-48df838ca045', 'https://firebasestorage.googleapis.com/v0/b/housefly-d7265.appspot.com/o/musics%2F(%20%C3%84%C2%90a%C3%8C%C2%A3%C3%8C%C2%86t%20)-%20We%20Are%20Love%20-%20TH%20(1).mp3?alt=media&token=fd08bf18-c272-4d2b-a53e-eacb029085c3', 293, 'fdffc199-4ca8-11ef-b561-841b77d63d09', '2024-08-04 15:36:17'),
('dfec67c6-13cc-4ad6-8fce-eb626958e2ac', 'Out Of My Mind', 'https://firebasestorage.googleapis.com/v0/b/housefly-d7265.appspot.com/o/music_images%2Fimages.jpg?alt=media&token=041e8d7e-302a-4d33-97ad-f4b2b3256948', 'https://firebasestorage.googleapis.com/v0/b/housefly-d7265.appspot.com/o/musics%2FOut%20Of%20My%20Mind%20-%20Win%20Remix.mp3?alt=media&token=1cdb6e25-5e6a-4e17-85e3-7026deffdf68', 309, 'fdffc199-4ca8-11ef-b561-841b77d63d09', '2024-08-04 15:48:48');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `subscriptions`
--

CREATE TABLE `subscriptions` (
  `subscription_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint NOT NULL,
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` timestamp NOT NULL,
  `plan_id` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `subscriptions`
--

INSERT INTO `subscriptions` (`subscription_id`, `is_active`, `user_id`, `start_date`, `end_date`, `plan_id`) VALUES
('b4597642-5479-11ef-b7bd-841b77d63d09', 1, 'cb56e9a9-e9e7-4034-8ee0-dcfd03dbf7bb', '2024-08-07 04:58:36', '2024-08-07 04:58:36', '1a9d8e64-5479-11ef-b7bd-841b77d63d09');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` int NOT NULL DEFAULT '1',
  `status` int NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_confirm` tinyint NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `email`, `avatar`, `password`, `role`, `status`, `created_at`, `is_confirm`) VALUES
('6eaa2a2d-a8bc-4d79-8ee1-c48f5e750bf9', 'binh', 'hn6006073@gmail.com', NULL, '$2b$10$zsJ6aeox5MTJnq0Xi6y/y.sT2I4uKolQD8CVMFLsnLY6vqMmCGv/G', 1, 1, '2024-07-27 12:49:14', 0),
('70a34a85-4cba-4c73-88a0-e85c96249e80', 'binh', 'hn6006075@gmail.com', NULL, '$2b$10$UPDELuz2nwzbhd9MBNaJOOMsHYXTVD5inG1G0g/ngeSnImrkkzFcW', 1, 1, '2024-07-27 12:49:20', 0),
('726b1e63-668a-4742-bb8d-5094c982c65c', 'binh', 'hn6006084@gmail.com', NULL, '$2b$10$JltRMTeTdsMbOR3sqiSLfO/T1tzBKAE9KZm/kb5VtXOmE6M6HJvM2', 1, 1, '2024-07-27 12:49:48', 0),
('79133a95-4de2-4e1b-9f83-2792b9e0f6ac', 'binh', 'hn6006062@gmail.com', NULL, '$2b$10$RhCo5EX441RMYFieoop0N.Ob66GUnMigdmz6rVPKlndtgcQ7wff2m', 1, 1, '2024-07-27 12:48:45', 0),
('94e661db-bb65-4cff-8b0b-de1ab0ba7786', 'binh', 'hn6006085@gmail.com', NULL, '$2b$10$b3eJE8wU/7Q9Yk5bB6Qnn.HCrGnOivDHSVWxOZiVCo3T5cthwI1r6', 1, 1, '2024-07-27 12:49:50', 0),
('95914965-d089-4f37-9506-1f13ab4d185a', 'binh', 'hn6006071@gmail.com', NULL, '$2b$10$7E6EcYqhmpFJaLBNZBqXi.fHzSDLOkNV5XXU4AUy7jADBdVbbJNTC', 1, 1, '2024-07-27 12:49:08', 0),
('989dc825-08e5-4619-9dfb-70bac599d883', 'binh', 'hn6006072@gmail.com', NULL, '$2b$10$7F9vOiXQ2f0H6lh.9bYxSu1QjOztzknLJJ.cx3RF4YJ9Mbnlri2KC', 1, 1, '2024-07-27 12:49:11', 0),
('9f709e3f-2b16-4a19-840c-deecf86f5316', 'binh', 'hn6006061@gmail.com', NULL, '$2b$10$br8BYdz9AZ8jF3C2/168A.aLqeif9kv7Lgql3oXTrlQO0jglRbE0K', 1, 1, '2024-07-27 12:48:42', 0),
('bad52bdb-a503-4b7e-a6e4-322d03b02510', 'binh', 'hn6006068@gmail.com', NULL, '$2b$10$8TquT8/3ED6/oqV6iS1Ls.LhGCOq8KaPtBboaTtoBGagHoLu6ncOa', 1, 1, '2024-07-27 12:49:01', 0),
('bfe00af5-38b7-433f-8f36-28910b8dd46e', 'binh', 'hn6006079@gmail.com', NULL, '$2b$10$ADJZS9Rb8dbE5WUKRj9DzeRVLG5qpTpei2O9eJOykpRdynGBzKxpi', 1, 1, '2024-07-27 12:49:32', 0),
('c5b23089-6a46-46fb-a1c0-0e36aeffd0f4', 'binh', 'hn6006060@gmail.com', NULL, '$2b$10$tniPH.FQ1BD7SZX3JtdQ.Otp5AD2teqLkWvxKaHbO3SjgaZqGh/jO', 1, 1, '2024-07-27 12:48:38', 0),
('cb56e9a9-e9e7-4034-8ee0-dcfd03dbf7bb', 'binhtommy', 'hn6006077@gmail.com', NULL, '$2b$10$Mu9kdQaadiKRXl3Huzrh6eTbzCoE8L9wLygFqPzmmq5jrHTyfPIQi', 2, 1, '2024-07-27 12:47:48', 0),
('cb6683ff-51c9-4ffb-bf85-4e64bee8f4d2', 'binh', 'hn6006064@gmail.com', NULL, '$2b$10$Rd2XHS05K5e/VhWIVr.JpOORLAzczB7xIA4sygBGKNYWtricAAcsu', 1, 1, '2024-07-27 12:48:50', 0),
('eb93c6fe-09bc-4bb0-ab5d-1d8eca838cd5', 'binh', 'hn6006074@gmail.com', NULL, '$2b$10$K4llyDZiUOMb/Pa2CdO6QeMdjUiyq0FMJukVVBzUplI.QHteRZiXK', 1, 1, '2024-07-27 12:49:17', 0),
('ecbc4ec1-3c29-4b59-b41a-c987f5a2c47e', 'binh', 'hn6006081@gmail.com', NULL, '$2b$10$ClSNhiPGQB4AJi9IzeFCW.lWIzFAyPh.4ngDIP6DZ7.dO8lUIY.DW', 1, 1, '2024-07-27 12:49:40', 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`album_id`),
  ADD KEY `FK_b6465bf462c2ffef5f066bc6f21` (`artist_id`);

--
-- Chỉ mục cho bảng `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`artist_id`);

--
-- Chỉ mục cho bảng `artist_song`
--
ALTER TABLE `artist_song`
  ADD PRIMARY KEY (`artist_song_id`),
  ADD KEY `FK_b6df0b0ac6935496060c5e41e80` (`artist_id`),
  ADD KEY `FK_f5d504e2ee9debdca827790f417` (`song_id`);

--
-- Chỉ mục cho bảng `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`genre_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `FK_a922b820eeef29ac1c6800e826a` (`user_id`),
  ADD KEY `FK_80074729ef5fcd963d90a8d0590` (`plan_id`);

--
-- Chỉ mục cho bảng `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`plan_id`);

--
-- Chỉ mục cho bảng `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`playlist_id`),
  ADD KEY `FK_a3ea169575c25e5c55494d7f382` (`user_id`);

--
-- Chỉ mục cho bảng `playlist_song`
--
ALTER TABLE `playlist_song`
  ADD PRIMARY KEY (`playlist_song_id`),
  ADD KEY `FK_bf47d280a95a3528ff259743005` (`song_id`),
  ADD KEY `FK_404e93f5821bb1475c17b08882a` (`playlist_id`);

--
-- Chỉ mục cho bảng `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`song_id`),
  ADD KEY `FK_622ffe28923ae45eb97ce536694` (`genre_id`);

--
-- Chỉ mục cho bảng `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`subscription_id`),
  ADD UNIQUE KEY `REL_d0a95ef8a28188364c546eb65c` (`user_id`),
  ADD KEY `FK_e45fca5d912c3a2fab512ac25dc` (`plan_id`);

--
-- Chỉ mục cho bảng `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `FK_e9acc6efa76de013e8c1553ed2b` (`user_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `albums`
--
ALTER TABLE `albums`
  ADD CONSTRAINT `FK_b6465bf462c2ffef5f066bc6f21` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`artist_id`);

--
-- Các ràng buộc cho bảng `artist_song`
--
ALTER TABLE `artist_song`
  ADD CONSTRAINT `FK_b6df0b0ac6935496060c5e41e80` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`artist_id`),
  ADD CONSTRAINT `FK_f5d504e2ee9debdca827790f417` FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK_80074729ef5fcd963d90a8d0590` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`plan_id`),
  ADD CONSTRAINT `FK_a922b820eeef29ac1c6800e826a` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `playlists`
--
ALTER TABLE `playlists`
  ADD CONSTRAINT `FK_a3ea169575c25e5c55494d7f382` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `playlist_song`
--
ALTER TABLE `playlist_song`
  ADD CONSTRAINT `FK_404e93f5821bb1475c17b08882a` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`playlist_id`),
  ADD CONSTRAINT `FK_bf47d280a95a3528ff259743005` FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`);

--
-- Các ràng buộc cho bảng `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `FK_622ffe28923ae45eb97ce536694` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`genre_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `FK_d0a95ef8a28188364c546eb65c1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `FK_e45fca5d912c3a2fab512ac25dc` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`plan_id`);

--
-- Các ràng buộc cho bảng `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `FK_e9acc6efa76de013e8c1553ed2b` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
