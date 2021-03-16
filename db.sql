CREATE TABLE `url_shortener` (
  `id` int(11) NOT NULL,
  `long_url` varchar(500) NOT NULL,
  `short_url` varchar(100) NOT NULL,
  `shortcode` varchar(500) NOT NULL,
  `hit` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `url_shortener`
--
ALTER TABLE `url_shortener`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `url_shortener`
--
ALTER TABLE `url_shortener`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;
