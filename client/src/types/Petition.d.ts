type Petition = {
    petitionId: number,
    title: string,
    categoryId: number,
    creationDate: string,
    ownerId: number,
    ownerFirstName: string,
    ownerLastName: string,
    numberOfSupporters: number,
    ownerImage?: string,
    supportingCost: number,
    info: string,
    moneyRaised: number,
    supportTiers: SupportTier[];
}

type PetitionInfo = {
    petitionId: number;
    petitionImage: string;
    title: string;
    categoryId: number;
    categoryName: string;
    creationDate: string;
    ownerId: number;
    ownerFirstName: string;
    ownerLastName: string;
    ownerImage: string;
    numberOfSupporters: number;
    supportingCost: number;
    info: string;
    moneyRaised: number;
    supportTiers: SupportTier[];
}

type CreatePetition = {
    title: string,
    description: string,
    categoryId: number,
    supportTiers: Array<SupportTierPost>,
    image: File | null;
}

type SupportTierPost = {
    title: string;
    description: string;
    cost: number;
};

type SupportTier = {
    supportTierId: number;
} & SupportTierPost;
