import { UserType } from "../features/authSlice"

export type userType = {
	name: string
}

export type ProfileUpdateResType = {
	status: number,
	message: string,
	data: UserType
}

export type BannerInfoType = {
	id: number,
	url: string,
	imageUrl: string
}

export type BannerResType = {
	status: number,
	message: string,
	data: BannerInfoType[]
}

export type StockInfoType = {
	url: string,
	imageUrl: string,
}

export type StockResType = {
	status: number,
	message: string,
	data: StockInfoType
}

export type FooterInfoType = {
	id: number,
	telegram_url: string,
	instagram_url: string,
	youtube_url: string,
	twitter_url: string,
	facebook_url: string,
	tik_tok_url: string,
	map: string
}

export type FooterResType = {
	status: number,
	message: string,
	data: FooterInfoType;
}

export type FooterSettingsInfoType = {
	logo: string,
	phone: string,
	email: string,
	address: string,
	workingDays: string
}

export type FooterSettingsResType = {
	status: number,
	message: string,
	data: FooterSettingsInfoType
}

export type BrandInfoType = {
	id: number,
	name: string,
	imageUrl: string
}[]

export type BrandsResType = {
	status: number,
	message: string,
	data: BrandInfoType
}

export type HeaderInfoType = {
	logo: string,
	phone: string;
}

export type HeaderResType = {
	status: number,
	message: string,
	data: HeaderInfoType
}

export type ProductType = {
	id: number,
	name: string,
	brandName: string,
	slug: string,
	price: number | null,
	old_price: number | null,
	imageUrl: string | null,
	userSaveProduct?: boolean
}

export type BestsellerResType = {
	status: number,
	message: string,
	data: ProductType[]
}

export type NewProductsResType = {
	status: number,
	message: string,
	data: ProductType[]
}


export type RecommendedProductsResType = {
	status: number,
	message: string,
	data: ProductType[]
}

export type PromotionInfoType = {
	id: number,
	title: string,
	description: string,
	imageUrl: string,
	url: string,
	price: string,
	oldPrice: string
}[]

export type PromotionsResType = {
	status: number,
	message: string,
	data: PromotionInfoType
}

export type SubCategoriesInfoType = CategoryType[]

export type CategoriesInfoType = {
	id: number,
	title: string,
	icon: string,
	slug: string,
	imageUrl: string,
	subCategories: SubCategoriesInfoType
}[]
export type CategoriesResType = {
	status: number,
	message: string,
	data: CategoriesInfoType
}

export type RecommendedCategoriesInfoType = {
	id: number,
	title: string,
	slug: string,
	imageUrl: string
}[]

export type RecommendedCategoriesResType = {
	status: number,
	message: string,
	data: RecommendedCategoriesInfoType
}

export type CategoryType = {
	id: number,
	title: string,
	slug: string,
	icon: string,
	imageUtl: string
}

export type ByCategoryProductsInfoType = {
	brands: {
		id: number,
		name: string,
		productCount: string
	}[],
	category: CategoryType,
	subCategory: CategoryType,
	characters: {
		id: number,
		name: string,
		assigns: {
			id: number,
			value: string
		}[]
	}[],
	products: {
		items: ProductType[],
		_links: _links,
		_meta: _meta
	}
	maxPrice: string,
	minPrice: string,
	categoryLikeProducts: ProductType[]
}

export type ByCategoryProductsResType = {
	status: number,
	message: string,
	data: ByCategoryProductsInfoType
}

export type MoreProductsInfoType = {
	brands: {
		id: number,
		name: string,
		productCount: string
	}[],
	characters: {
		id: number,
		name: string,
		assigns: {
			id: number,
			value: string
		}[]
	}[][],
	products: {
		items: ProductType[],
		_links: _links,
		_meta: _meta
	}
	maxPrice: string,
	minPrice: string,
	categoryLikeProducts: ProductType[]
}

export type MoreProductsResType = {
	status: number,
	message: string,
	data: MoreProductsInfoType
}

export type SearchInfoType = {
	items: ProductType[],
	_links: _links,
	_meta: _meta
}

export type SearchResType = {
	status: number,
	message: string,
	data: SearchInfoType
}

export type MenuCategoriesInfoType = {
	id: number,
	title: string,
	slug: string
}[]

export type MenuCategoriesResType = {
	status: number,
	message: string,
	data: MenuCategoriesInfoType
}

export type _meta = {
	totalCount: number,
	pageCount: number,
	currentPage: number,
	perPage: number
}

export type _links = {
	self: {
		href: string
	},
	first?: {
		href: string
	},
	last?: {
		href: string
	},
	next?: {
		href: string
	},
}

export type LeftMenuInfoType = {
	id: number,
	title: string,
	imageUrl: string,
	short_description: string,
	content: string,
	slug: string
}

export type LeftMenuResType = {
	status: number,
	message: string,
	data: LeftMenuInfoType[]
}

export type OneLeftMenuResType = {
	status: number,
	message: string,
	data: LeftMenuInfoType
}


export type HeaderTopMenuInfoType = {
	name: string,
	urlValue: string,
	urlType: string
	imageUrl: string
}[]

export type HeaderTopMenuResType = {
	status: number,
	message: string,
	data: HeaderTopMenuInfoType
}

export type FooterMenuInfoType = {
	menu1: HeaderTopMenuInfoType,
	menu2: HeaderTopMenuInfoType
}

export type FooterMenuResType = {
	status: number,
	message: string,
	data: FooterMenuInfoType
}

export type CharacterAssignsType = {
	id: number,
	characterName: string,
	value: string
}

export type ProductDetailInfoType = {
	id: number,
	name: string,
	slug: string,
	imageUrl: string,
	description: string,
	short_description: string,
	meta_title: string,
	meta_description: string,
	meta_keyword: string,
	price: number | null,
	old_price: number | null,
	category: string,
	categorySlug: string,
	subCategory: string,
	subCategorySlug: string,
	characterAssigns: CharacterAssignsType[],
	images: string[],
	is_delivery: number,
	delivery_price: number,
	brandName: string
}

export type ProductDetailResType = {
	status: number,
	message: string,
	data: ProductDetailInfoType
}

export type ReturnExchangeInfoType = {
	id: number,
	url: string,
	title: string,
	description: string
}

export type ReturnExchangeResType = {
	status: number,
	message: string,
	data: ReturnExchangeInfoType
}

export type PaymentListInfoType = {
	id: number,
	title: string
}[]

export type PaymentListResTyoe = {
	status: number,
	message: string,
	data: PaymentListInfoType
}

export type AllNewProductsInfoType = {
	items: ProductType[],
	_links: _links,
	_meta: _meta
}

export type AllNewProductsResType = {
	status: number,
	message: string,
	data: {
		products: AllNewProductsInfoType
	}
}

