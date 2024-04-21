PGDMP      ;                |         	   ecommerce    16.2    16.2 +    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16406 	   ecommerce    DATABASE     |   CREATE DATABASE ecommerce WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE ecommerce;
                postgres    false            �            1259    16449 	   _about_us    TABLE       CREATE TABLE public._about_us (
    about_id smallint,
    about_heading character varying(20) DEFAULT NULL::character varying,
    about_short_desc character varying(221) DEFAULT NULL::character varying,
    about_desc character varying(780) DEFAULT NULL::character varying
);
    DROP TABLE public._about_us;
       public         heap    postgres    false            �            1259    16457    _admins    TABLE     @  CREATE TABLE public._admins (
    admin_id smallint,
    admin_name character varying(13) DEFAULT NULL::character varying,
    admin_email character varying(14) DEFAULT NULL::character varying,
    admin_pass character varying(12) DEFAULT NULL::character varying,
    admin_image character varying(20) DEFAULT NULL::character varying,
    admin_contact bigint,
    admin_country character varying(7) DEFAULT NULL::character varying,
    admin_job character varying(19) DEFAULT NULL::character varying,
    admin_about character varying(383) DEFAULT NULL::character varying
);
    DROP TABLE public._admins;
       public         heap    postgres    false            �            1259    16467    _bundle_product_relation    TABLE     ?  CREATE TABLE public._bundle_product_relation (
    rel_id character varying(1) DEFAULT NULL::character varying,
    rel_title character varying(1) DEFAULT NULL::character varying,
    product_id character varying(1) DEFAULT NULL::character varying,
    bundle_id character varying(1) DEFAULT NULL::character varying
);
 ,   DROP TABLE public._bundle_product_relation;
       public         heap    postgres    false            �            1259    16474    _cart    TABLE     ]  CREATE TABLE public._cart (
    p_id character varying(1) DEFAULT NULL::character varying,
    ip_add character varying(1) DEFAULT NULL::character varying,
    qty character varying(1) DEFAULT NULL::character varying,
    p_price character varying(1) DEFAULT NULL::character varying,
    size character varying(1) DEFAULT NULL::character varying
);
    DROP TABLE public._cart;
       public         heap    postgres    false            �            1259    16482    _categories    TABLE       CREATE TABLE public._categories (
    cat_id smallint,
    cat_title character varying(8) DEFAULT NULL::character varying,
    cat_top character varying(3) DEFAULT NULL::character varying,
    cat_image character varying(13) DEFAULT NULL::character varying
);
    DROP TABLE public._categories;
       public         heap    postgres    false            �            1259    16488    _contact_us    TABLE       CREATE TABLE public._contact_us (
    contact_id smallint,
    contact_email character varying(18) DEFAULT NULL::character varying,
    contact_heading character varying(14) DEFAULT NULL::character varying,
    contact_desc character varying(111) DEFAULT NULL::character varying
);
    DROP TABLE public._contact_us;
       public         heap    postgres    false            �            1259    16494    _coupons    TABLE     /  CREATE TABLE public._coupons (
    coupon_id smallint,
    product_id smallint,
    coupon_title character varying(4) DEFAULT NULL::character varying,
    coupon_price smallint,
    coupon_code character varying(9) DEFAULT NULL::character varying,
    coupon_limit smallint,
    coupon_used smallint
);
    DROP TABLE public._coupons;
       public         heap    postgres    false            �            1259    16499    _customer_orders    TABLE     h  CREATE TABLE public._customer_orders (
    order_id smallint,
    customer_id smallint,
    due_amount smallint,
    invoice_no bigint,
    qty smallint,
    size character varying(6) DEFAULT NULL::character varying,
    order_date character varying(19) DEFAULT NULL::character varying,
    order_status character varying(8) DEFAULT NULL::character varying
);
 $   DROP TABLE public._customer_orders;
       public         heap    postgres    false            �            1259    16505 
   _customers    TABLE       CREATE TABLE public._customers (
    customer_id smallint NOT NULL,
    customer_name character varying(50) DEFAULT NULL::character varying,
    customer_email character varying(100) DEFAULT NULL::character varying,
    customer_pass character varying(100) DEFAULT NULL::character varying,
    customer_country character varying(100) DEFAULT NULL::character varying,
    customer_city character varying(100) DEFAULT NULL::character varying,
    customer_contact bigint,
    customer_address character varying(100) DEFAULT NULL::character varying,
    customer_image character varying(100) DEFAULT NULL::character varying,
    customer_ip character varying(3) DEFAULT NULL::character varying,
    customer_confirm_code character varying(100) DEFAULT NULL::character varying
);
    DROP TABLE public._customers;
       public         heap    postgres    false            �            1259    16595    _customers_customer_id_seq    SEQUENCE     �   ALTER TABLE public._customers ALTER COLUMN customer_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public._customers_customer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    223            �            1259    16517    _enquiry_types    TABLE     �   CREATE TABLE public._enquiry_types (
    enquiry_id smallint,
    enquiry_title character varying(26) DEFAULT NULL::character varying
);
 "   DROP TABLE public._enquiry_types;
       public         heap    postgres    false            �            1259    16521    _manufacturers    TABLE     ,  CREATE TABLE public._manufacturers (
    manufacturer_id smallint,
    manufacturer_title character varying(12) DEFAULT NULL::character varying,
    manufacturer_top character varying(2) DEFAULT NULL::character varying,
    manufacturer_image character varying(17) DEFAULT NULL::character varying
);
 "   DROP TABLE public._manufacturers;
       public         heap    postgres    false            �            1259    16527 	   _payments    TABLE       CREATE TABLE public._payments (
    payment_id smallint,
    invoice_no bigint,
    amount smallint,
    payment_mode character varying(13) DEFAULT NULL::character varying,
    ref_no bigint,
    code integer,
    payment_date character varying(10) DEFAULT NULL::character varying
);
    DROP TABLE public._payments;
       public         heap    postgres    false            �            1259    16532    _pending_orders    TABLE     !  CREATE TABLE public._pending_orders (
    order_id smallint,
    customer_id smallint,
    invoice_no bigint,
    product_id smallint,
    qty smallint,
    size character varying(6) DEFAULT NULL::character varying,
    order_status character varying(8) DEFAULT NULL::character varying
);
 #   DROP TABLE public._pending_orders;
       public         heap    postgres    false            �            1259    16537    _product_categories    TABLE       CREATE TABLE public._product_categories (
    p_cat_id smallint,
    p_cat_title character varying(8) DEFAULT NULL::character varying,
    p_cat_top character varying(3) DEFAULT NULL::character varying,
    p_cat_image character varying(14) DEFAULT NULL::character varying
);
 '   DROP TABLE public._product_categories;
       public         heap    postgres    false            �            1259    16543 	   _products    TABLE       CREATE TABLE public._products (
    product_id smallint,
    p_cat_id smallint,
    cat_id smallint,
    manufacturer_id smallint,
    date character varying(19) DEFAULT NULL::character varying,
    product_title character varying(36) DEFAULT NULL::character varying,
    product_url character varying(25) DEFAULT NULL::character varying,
    product_img1 character varying(68) DEFAULT NULL::character varying,
    product_img2 character varying(68) DEFAULT NULL::character varying,
    product_img3 character varying(68) DEFAULT NULL::character varying,
    product_price smallint,
    product_psp_price smallint,
    product_desc character varying(2000) DEFAULT NULL::character varying,
    product_features character varying(282) DEFAULT NULL::character varying,
    product_video character varying(147) DEFAULT NULL::character varying,
    product_keywords character varying(32) DEFAULT NULL::character varying,
    product_label character varying(8) DEFAULT NULL::character varying,
    status character varying(7) DEFAULT NULL::character varying
);
    DROP TABLE public._products;
       public         heap    postgres    false            �            1259    16560    _store    TABLE     �  CREATE TABLE public._store (
    store_id smallint,
    store_title character varying(14) DEFAULT NULL::character varying,
    store_image character varying(13) DEFAULT NULL::character varying,
    store_desc character varying(341) DEFAULT NULL::character varying,
    store_button character varying(8) DEFAULT NULL::character varying,
    store_url character varying(36) DEFAULT NULL::character varying
);
    DROP TABLE public._store;
       public         heap    postgres    false            �            1259    16568    _terms    TABLE       CREATE TABLE public._terms (
    term_id smallint,
    term_title character varying(29) DEFAULT NULL::character varying,
    term_link character varying(5) DEFAULT NULL::character varying,
    term_desc character varying(1203) DEFAULT NULL::character varying
);
    DROP TABLE public._terms;
       public         heap    postgres    false            �            1259    16576 	   _wishlist    TABLE     o   CREATE TABLE public._wishlist (
    wishlist_id smallint,
    customer_id smallint,
    product_id smallint
);
    DROP TABLE public._wishlist;
       public         heap    postgres    false            k          0    16449 	   _about_us 
   TABLE DATA           Z   COPY public._about_us (about_id, about_heading, about_short_desc, about_desc) FROM stdin;
    public          postgres    false    215   �>       l          0    16457    _admins 
   TABLE DATA           �   COPY public._admins (admin_id, admin_name, admin_email, admin_pass, admin_image, admin_contact, admin_country, admin_job, admin_about) FROM stdin;
    public          postgres    false    216   $A       m          0    16467    _bundle_product_relation 
   TABLE DATA           \   COPY public._bundle_product_relation (rel_id, rel_title, product_id, bundle_id) FROM stdin;
    public          postgres    false    217   �B       n          0    16474    _cart 
   TABLE DATA           A   COPY public._cart (p_id, ip_add, qty, p_price, size) FROM stdin;
    public          postgres    false    218   �B       o          0    16482    _categories 
   TABLE DATA           L   COPY public._categories (cat_id, cat_title, cat_top, cat_image) FROM stdin;
    public          postgres    false    219   �B       p          0    16488    _contact_us 
   TABLE DATA           _   COPY public._contact_us (contact_id, contact_email, contact_heading, contact_desc) FROM stdin;
    public          postgres    false    220   &C       q          0    16494    _coupons 
   TABLE DATA           }   COPY public._coupons (coupon_id, product_id, coupon_title, coupon_price, coupon_code, coupon_limit, coupon_used) FROM stdin;
    public          postgres    false    221   �C       r          0    16499    _customer_orders 
   TABLE DATA           ~   COPY public._customer_orders (order_id, customer_id, due_amount, invoice_no, qty, size, order_date, order_status) FROM stdin;
    public          postgres    false    222   �C       s          0    16505 
   _customers 
   TABLE DATA           �   COPY public._customers (customer_id, customer_name, customer_email, customer_pass, customer_country, customer_city, customer_contact, customer_address, customer_image, customer_ip, customer_confirm_code) FROM stdin;
    public          postgres    false    223   E       t          0    16517    _enquiry_types 
   TABLE DATA           C   COPY public._enquiry_types (enquiry_id, enquiry_title) FROM stdin;
    public          postgres    false    224   �F       u          0    16521    _manufacturers 
   TABLE DATA           s   COPY public._manufacturers (manufacturer_id, manufacturer_title, manufacturer_top, manufacturer_image) FROM stdin;
    public          postgres    false    225   �F       v          0    16527 	   _payments 
   TABLE DATA           m   COPY public._payments (payment_id, invoice_no, amount, payment_mode, ref_no, code, payment_date) FROM stdin;
    public          postgres    false    226   |G       w          0    16532    _pending_orders 
   TABLE DATA           q   COPY public._pending_orders (order_id, customer_id, invoice_no, product_id, qty, size, order_status) FROM stdin;
    public          postgres    false    227   �H       x          0    16537    _product_categories 
   TABLE DATA           \   COPY public._product_categories (p_cat_id, p_cat_title, p_cat_top, p_cat_image) FROM stdin;
    public          postgres    false    228   �I       y          0    16543 	   _products 
   TABLE DATA             COPY public._products (product_id, p_cat_id, cat_id, manufacturer_id, date, product_title, product_url, product_img1, product_img2, product_img3, product_price, product_psp_price, product_desc, product_features, product_video, product_keywords, product_label, status) FROM stdin;
    public          postgres    false    229   J       z          0    16560    _store 
   TABLE DATA           i   COPY public._store (store_id, store_title, store_image, store_desc, store_button, store_url) FROM stdin;
    public          postgres    false    230   mL       {          0    16568    _terms 
   TABLE DATA           K   COPY public._terms (term_id, term_title, term_link, term_desc) FROM stdin;
    public          postgres    false    231   �L       |          0    16576 	   _wishlist 
   TABLE DATA           I   COPY public._wishlist (wishlist_id, customer_id, product_id) FROM stdin;
    public          postgres    false    232   �L       �           0    0    _customers_customer_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public._customers_customer_id_seq', 7, true);
          public          postgres    false    233            �           2606    16593    _customers _customers_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public._customers
    ADD CONSTRAINT _customers_pkey PRIMARY KEY (customer_id);
 D   ALTER TABLE ONLY public._customers DROP CONSTRAINT _customers_pkey;
       public            postgres    false    223            k   T  x�MS[��@��9��k�6���@ �?�[��m������O�3K3�-��J��{����D�6���xx����H+1e+Im�g��$yh�fn�t�$NW͙z���9�Q���� �B��&���h[y��R�no�@�V)�:�D�jz��jT|5��^ֺ-A�$��f�.�̟��J�|�|#����J�diM�>����P�z�,g��B��{=SL��m[��*��@���׎>��!P\��B�o��d�N�s�唤�T�K ,��Kl��j��9�'�~k��z-Z�9�
�����h�A
wx]�%�[*-��m��^�0)�� R��҅3�}N;�Wt�r�g2�$��*v��a.�m:�7\\zU� <��Ş���Rg]cڀP ���5@KbO��C}��H��E�$	T#�A�]�*>ƺA��⬤�.�8�&�[e��w���G��=N����{�����:�p�v�k?�?�>�a84<�w�6�\�G�E����;,V�e�񼑷�#��������� :���X� �H�=	tF+��̀�]�d$H�/<)�}�Z��S��Ř?xMxIw��u�7���N�嵻\.u�z�      l   P  x�U��n�0E��_q? ����K+*��'^��lb���ƓB�gW �7{�;��C�ɧ�C5%�h��%
qp���T�/Q���[*뾨�C�}�6�<u��x��ET���Q%��!{|�7�RX�S{R�&(R�H�W���=�E9��%!Td1ԐJ\���$��O��*T�*B�v9���E<��Q��gQ�Y[��#�O=]B��Ɗ�8�X��B��-����ŝb�&�ҷ%��M�k�P*�����3�8I�<���#��ڤQ��K��+�͌�L!��md�����I��sc��z)M�&n@��I6�U�i��&\�n�"7���~���R�5      m      x������ � �      n      x������ � �      o   X   x�3�tK�����K����L�Ss��
�ҹ�9�3S�A��@(�U��e��_��ZT�Y�Z̙bf&��՛r����ss`���qqq �� |      p   �   x�-�1
1D��)� Q[��^�mB�hp7_�OV���|o�n`�٪(Osȓ�4���+�����Ua!BY�n��������DNHJ�
�_n}������Tuɑ�,�c6|D��ܑD��a{�n�ι/#4v      q   5   x�3��N�I�44�tv	��4�4�2�44����r:���B���R1z\\\ G�>      r   �   x�m�Aj�@E��)|}�h��m����n1!`��������o%=�����	UI�����i$a��2�\��e��x9�/�N�8����3�����w��`�: ��������|�Ɵ��L�.�&��5��
zK�b��`�8b��f�o��S���)!^$�\�� ?��4����mA��:S*!���7Pt�fkt�DtuT-��ޅ��F�@�$k���՝�7P%�݀�i$U͆�J�9�G3�/]����qV      s   �  x�u�mO�0�_�>�^�V\۱_�B�F@Ԙ���Y���v(�ޭ0��M{wi���C���KB���&��̝ܰjL٧�T�5Ę�1A ��I6w�e^��K&
wXiS�������Y����PYj��J����� �fS�,SLk�T�����_���BP�nI<��J��[Nk�rO89	�n)� ���둘��\+��ȴ����전EEmKaw�a�VW1f��t{&����G$
B�	`f���&���	�=}��j��t�rS�O�q����	kMr��k��p;�v�י�y9z���8���z���I�5�YdW���t,�V��w���#�!�G5���8Q�倉�I3|�k�)�;��v?����8�"�Ө      t   G   x�3��/JI-RH�KQpI��,K-�T.-(�/*�2�IM���LŃ�se&�*8��%��q��qqq J��      u   �   x�-�A�0��+��(��r�PP	��X��M�iW;;{8
X@2` NV%�n�u�5�/J��/b��s$���9���,M���	|���k>ľ5�.��ۍ�UVpV�w�St͛�1��S3v      v   D  x�}��N�@Ek�W�,���i��
�� ��
$��ŝ�>J%���/%	n����Y�������t ��T+)KlE�,�Rk��L���5���Z��d�>�?>����~:�M$,�ޒ!��HĀQ��I���es�����%31���X�a�9$��Q��X�$�7ϊ^-�Fs:{E�|B�J�х������1��N"f��֌��LyeF�%6�y�!�,k�x�C����u=lB=�|��3V�
��ľ"�d9}�c� ~^'P���v\C�X��^��#��X�%j+�t��@����-�:Ká;������4f1/�W��/�m��      w   �   x�m��
A ���H��ֶZ����p�"��FDO�ʰ��	90��*KE����p;v���p:H�AQ���mN�	֗�:�{/\!_��!�2h2o͌h"�Z�=�d�|wy�d�hh�R�M�q��D2b�z9$��rZ6�5���!0hH�n�7	'�ĪZ�u�����W��'��M�      x   m   x�5ͻ
�0����]��Z�m�mB�A�d"�o�q��>�`�.3B�b���Ŵ�+�nI$sI��O.S*Ēj=>���.b�o����AI��P1�xr��QZ�[cnq�9�      y   R  x��VmO�0�|���l'.i��xi�V)�$d��p��v��s�R��&�W�8�}~��{y�V�*<�K�����HE�J�T�<��-~.+*�9O��O:�#���6����)�҃g�
�TX��V*l��x<���X��	�͵3eA����hn�`D�݈Z�^�j�s�k�g��a�^4�p�8�r[6���ܢ��w�����,I��c�}�@�Av�Fw�]w�2C��9�����O~�ز��Z?o/	��	<4u���u:�'z��s[�;Z�=V[�oQ[ԫ���ƅS�~��"�Q�z��I*��0-�����ݓ�8v�*_j(h�m���5�QbymV;=Q�S�1��ňC���>\���;�մ]��)�0!�[K�c
"��8Jy�FI�	.j<_Ĭ���T/�­
���۵����v�5��Ҽ6�b����B!9!6r�}f��W�����l��ޅ�wc
Շ"y
�B��x��2�p��U�m���x�C{_Wx^��yi=佄5A��InErӚ�ޱ�\n.��P��n(���8����]���NϦ�&����8[e6ӆভ
C����`�Z�      z      x������ � �      {      x������ � �      |      x������ � �     